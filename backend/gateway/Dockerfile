FROM openjdk:17-alpine

WORKDIR /app

COPY target/gateway-0.0.1-SNAPSHOT.jar /app/gateway.jar

EXPOSE 8888

CMD ["java", "-jar", "/app/gateway.jar"]
