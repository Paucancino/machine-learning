from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os

from feature_columns import FEATURE_COLUMNS

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

modelo = joblib.load(os.path.join(BASE_DIR, "modelo_final.pkl"))
escalador = joblib.load(os.path.join(BASE_DIR, "escalador.pkl"))
imputador = joblib.load(os.path.join(BASE_DIR, "imputador.pkl"))

# Categorías válidas para cada variable categórica (coinciden exactamente con las
# categorías de texto usadas al entrenar el modelo con pd.get_dummies(drop_first=True)).
# La categoría marcada como "baseline" es la que se eliminó por drop_first, así que
# no genera ninguna columna (todas las columnas one-hot de esa variable quedan en 0).
GENDER_CATEGORIAS = ["Female", "Male", "Nonbinary ", "unsure "]        # Female = baseline
RELATIONSHIP_CATEGORIAS = ["Divorced", "In a relationship", "Married", "Single"]  # Divorced = baseline
OCCUPATION_CATEGORIAS = ["Retired", "Salaried Worker", "School Student", "University Student"]  # Retired = baseline
ORGANIZATION_CATEGORIAS = ["Company", "University", "Private", "School", "Goverment", "Unknown"]  # Company = baseline

CAMPOS_NUMERICOS = {
    "age": (10, 100),
    "Use_Social_Media": (0, 1),
    "Daily_SocialMedia_Hours": (1, 6),
    "Purposeless_use": (1, 5),
    "SocialMedia_Distraction": (1, 5),
    "Restlessness": (1, 5),
    "Attention_Distraction": (1, 5),
    "Worry_Level": (1, 5),
    "Concentration_Difficulty": (1, 5),
    "Social_Comparison": (1, 5),
    "Comparison_Feeling": (1, 5),
    "Validation_Seeking": (1, 5),
    "Depression_Level": (1, 5),
    "Interest_Fluctuation": (1, 5),
    "Sleep_Problems": (1, 5),
}


@app.route("/")
def inicio():
    return render_template("index.html")


def numero(datos, campo, minimo, maximo):
    if campo not in datos:
        raise ValueError(f"Falta el campo requerido: {campo}")
    try:
        valor = float(datos[campo])
    except (TypeError, ValueError):
        raise ValueError(f"El campo {campo} debe ser numérico.")
    if valor < minimo or valor > maximo:
        raise ValueError(f"{campo} debe estar entre {minimo} y {maximo}.")
    return valor


def categoria(datos, campo, permitidas):
    valor = datos.get(campo)
    if valor not in permitidas:
        raise ValueError(f"{campo} debe ser una de: {permitidas}")
    return valor


@app.route("/predict", methods=["POST"])
def predict():
    try:
        datos = request.get_json(silent=True)
        if not datos:
            return jsonify({"error": "No se recibieron datos."}), 400

        fila = {campo: numero(datos, campo, minimo, maximo)
                for campo, (minimo, maximo) in CAMPOS_NUMERICOS.items()}

        gender = categoria(datos, "Gender", GENDER_CATEGORIAS)
        relationship = categoria(datos, "Relationship_Status", RELATIONSHIP_CATEGORIAS)
        occupation = categoria(datos, "Occupation_Status", OCCUPATION_CATEGORIAS)
        organization = categoria(datos, "Organization", ORGANIZATION_CATEGORIAS)

        # Inicializamos todas las columnas one-hot en 0 y activamos solo la que corresponde
        # (si la categoría es la "baseline", ninguna columna se activa, tal como en el
        # entrenamiento con drop_first=True).
        for col in FEATURE_COLUMNS:
            if col.startswith(("Gender_", "Relationship_Status_", "Occupation_Status_", "Organization_")):
                fila[col] = 0

        if f"Gender_{gender}" in fila:
            fila[f"Gender_{gender}"] = 1
        if f"Relationship_Status_{relationship}" in fila:
            fila[f"Relationship_Status_{relationship}"] = 1
        if f"Occupation_Status_{occupation}" in fila:
            fila[f"Occupation_Status_{occupation}"] = 1
        if f"Organization_{organization}" in fila:
            fila[f"Organization_{organization}"] = 1

        # Índices compuestos: NO se usan como entrada del modelo (el notebook los excluye
        # de X), pero sí se calculan aquí para mostrarlos en la interfaz de resultados.
        indice_salud_mental = float(np.mean([
            fila["Depression_Level"], fila["Worry_Level"],
            fila["Sleep_Problems"], fila["Interest_Fluctuation"]
        ]))
        indice_uso_compulsivo = float(np.mean([
            fila["Purposeless_use"], fila["SocialMedia_Distraction"],
            fila["Attention_Distraction"], fila["Restlessness"], fila["Validation_Seeking"]
        ]))
        indice_comparacion_social = float(np.mean([
            fila["Social_Comparison"], fila["Comparison_Feeling"]
        ]))
        indice_final = float(np.mean([
            indice_salud_mental, indice_uso_compulsivo, indice_comparacion_social
        ]))

        entrada = pd.DataFrame([fila], columns=FEATURE_COLUMNS)
        entrada_imp = imputador.transform(entrada)
        entrada_scaled = escalador.transform(entrada_imp)

        clase = int(modelo.predict(entrada_scaled)[0])
        probabilidades = modelo.predict_proba(entrada_scaled)[0]
        confianza = round(float(np.max(probabilidades)) * 100, 2)

        posiciones = {0: 15, 1: 50, 2: 85}
        porcentaje = round(sum(
            posiciones[int(c)] * float(p)
            for c, p in zip(modelo.classes_, probabilidades)
        ))

        configuracion = {
            0: ("RIESGO BAJO", "#10B981",
                "Tus respuestas muestran un uso relativamente equilibrado de las redes sociales."),
            1: ("RIESGO MODERADO", "#F59E0B",
                "Se observan patrones que conviene vigilar y ajustar."),
            2: ("RIESGO ALTO", "#EF4444",
                "Se detectaron patrones de uso problemático que pueden afectar tu bienestar.")
        }
        etiqueta, color, mensaje = configuracion[clase]

        return jsonify({
            "clase": clase,
            "etiqueta": etiqueta,
            "porcentaje": porcentaje,
            "color": color,
            "mensaje": mensaje,
            "confianza": confianza,
            "indices": {
                "salud_mental": round(indice_salud_mental, 2),
                "uso_compulsivo": round(indice_uso_compulsivo, 2),
                "comparacion_social": round(indice_comparacion_social, 2),
                "puntaje_final": round(indice_final, 2)
            }
        })

    except Exception as error:
        print("ERROR EN /predict:", repr(error))
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(debug=True)
