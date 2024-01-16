FROM openjdk:17-alpine

WORKDIR /app

COPY target/TaxeManagement-0.0.1-SNAPSHOT.jar /app/TaxeManagement.jar

EXPOSE 8085

CMD ["java", "-jar", "/app/TaxeManagement.jar"]
