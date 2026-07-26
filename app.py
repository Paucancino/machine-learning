from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Cargar el modelo entrenado
paquete = joblib.load("modelo_random_forest_nat.pkl")

modelo = paquete["modelo"]
columnas_modelo = paquete["columnas"]
encoders = paquete["encoders"]


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        datos = request.get_json()

        if not datos:
            return jsonify({
                "error": "No se recibieron datos."
            }), 400

        campos_requeridos = [
            "Country",
            "Age",
            "Gender",
            "Occupation",
            "Daily_Screen_Time_Hours",
            "Phone_Unlocks_Per_Day",
            "Social_Media_Usage_Hours",
            "Gaming_Usage_Hours",
            "Streaming_Usage_Hours",
            "Work_Related_Usage_Hours",
            "Sleep_Hours",
            "Physical_Activity_Hours",
            "Depression_Score",
            "Anxiety_Score",
            "Stress_Level",
            "Online_Shopping_Hours",
            "Push_Notifications_Per_Day",
            "Tech_Savviness_Score"
        ]

        faltantes = [
            campo
            for campo in campos_requeridos
            if campo not in datos
        ]

        if faltantes:
            return jsonify({
                "error": "Faltan datos requeridos.",
                "campos_faltantes": faltantes
            }), 400

        # Convertir variables categóricas con los mismos encoders
        try:
            country_codificado = encoders["Country"].transform(
                [datos["Country"]]
            )[0]

            gender_codificado = encoders["Gender"].transform(
                [datos["Gender"]]
            )[0]

            occupation_codificado = encoders["Occupation"].transform(
                [datos["Occupation"]]
            )[0]

        except ValueError as error:
            return jsonify({
                "error": f"Valor categórico no reconocido: {str(error)}"
            }), 400

        # Variables originales
        age = float(datos["Age"])
        screen_time = float(datos["Daily_Screen_Time_Hours"])
        unlocks = float(datos["Phone_Unlocks_Per_Day"])
        social_media = float(datos["Social_Media_Usage_Hours"])
        gaming = float(datos["Gaming_Usage_Hours"])
        streaming = float(datos["Streaming_Usage_Hours"])
        work_usage = float(datos["Work_Related_Usage_Hours"])
        sleep = float(datos["Sleep_Hours"])
        physical_activity = float(datos["Physical_Activity_Hours"])
        depression = float(datos["Depression_Score"])
        anxiety = float(datos["Anxiety_Score"])
        stress = float(datos["Stress_Level"])
        shopping = float(datos["Online_Shopping_Hours"])
        notifications = float(datos["Push_Notifications_Per_Day"])
        tech_savviness = float(datos["Tech_Savviness_Score"])

        # Variables calculadas exactamente como en el entrenamiento
        personal_data_index = (
            age * 0.40
            + occupation_codificado * 0.35
            + gender_codificado * 0.15
            + country_codificado * 0.10
        )

        mental_health_index = (
            depression * 0.40
            + anxiety * 0.35
            + stress * 0.25
        )

        compulsive_use_index = (
            screen_time * 0.35
            + unlocks * 0.35
            + notifications * 0.30
        )

        recreational_use_index = (
            social_media * 0.35
            + gaming * 0.30
            + streaming * 0.25
            + shopping * 0.10
        )

        productive_use_index = (
            work_usage * 0.70
            + tech_savviness * 0.30
        )

        interruption_index = (
            notifications * 0.40
            + unlocks * 0.35
            + screen_time * 0.25
        )

        digital_balance_index = (
            sleep * 0.40
            + physical_activity * 0.35
            + productive_use_index * 0.25
        )

        fila = {
            "Country": country_codificado,
            "Age": age,
            "Gender": gender_codificado,
            "Occupation": occupation_codificado,
            "Daily_Screen_Time_Hours": screen_time,
            "Phone_Unlocks_Per_Day": unlocks,
            "Social_Media_Usage_Hours": social_media,
            "Gaming_Usage_Hours": gaming,
            "Streaming_Usage_Hours": streaming,
            "Work_Related_Usage_Hours": work_usage,
            "Sleep_Hours": sleep,
            "Physical_Activity_Hours": physical_activity,
            "Depression_Score": depression,
            "Anxiety_Score": anxiety,
            "Stress_Level": stress,
            "Online_Shopping_Hours": shopping,
            "Push_Notifications_Per_Day": notifications,
            "Tech_Savviness_Score": tech_savviness,
            "PersonalData_Index": personal_data_index,
            "MentalHealth_Index": mental_health_index,
            "CompulsiveUse_Index": compulsive_use_index,
            "RecreationalUse_Index": recreational_use_index,
            "ProductiveUse_Index": productive_use_index,
            "Interruption_Index": interruption_index,
            "DigitalBalance_Index": digital_balance_index
        }

        entrada = pd.DataFrame([fila])

        # Respetar exactamente el orden de columnas del entrenamiento
        entrada = entrada[columnas_modelo]

        clase = int(modelo.predict(entrada)[0])

        probabilidades = modelo.predict_proba(entrada)[0]

        probabilidad_clase = float(np.max(probabilidades))

        configuracion = {
            0: {
                "etiqueta": "RIESGO BAJO",
                "porcentaje": 18,
                "color": "#10B981",
                "mensaje": (
                    "Tus hábitos digitales muestran un equilibrio saludable. "
                    "Mantén tus buenas prácticas y realiza pausas frecuentes."
                )
            },
            1: {
                "etiqueta": "RIESGO MODERADO",
                "porcentaje": 52,
                "color": "#F59E0B",
                "mensaje": (
                    "Se observan algunos patrones de uso que conviene vigilar. "
                    "Pequeños cambios pueden mejorar tu bienestar digital."
                )
            },
            2: {
                "etiqueta": "RIESGO ALTO",
                "porcentaje": 86,
                "color": "#EF4444",
                "mensaje": (
                    "Se detectaron patrones de uso problemático de tecnologías "
                    "digitales. Es recomendable ajustar tus hábitos y buscar "
                    "apoyo si afectan tu vida diaria."
                )
            }
        }

        resultado = configuracion.get(
            clase,
            {
                "etiqueta": "RESULTADO DESCONOCIDO",
                "porcentaje": 0,
                "color": "#64748B",
                "mensaje": "No fue posible interpretar la clase predicha."
            }
        )

        return jsonify({
            "clase": clase,
            "etiqueta": resultado["etiqueta"],
            "porcentaje": resultado["porcentaje"],
            "color": resultado["color"],
            "mensaje": resultado["mensaje"],
            "confianza": round(probabilidad_clase * 100, 2),
            "probabilidades": {
                str(clase_modelo): round(
                    float(probabilidad) * 100,
                    2
                )
                for clase_modelo, probabilidad
                in zip(modelo.classes_, probabilidades)
            }
        })

    except Exception as error:
        print("ERROR EN /predict:", error)

        return jsonify({
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)