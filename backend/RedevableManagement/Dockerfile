FROM openjdk:17-alpine

WORKDIR /app

COPY target/spring-boot-security-jwt-0.0.1-SNAPSHOT.jar /app/spring-boot-security-jwt.jar

EXPOSE 8094

CMD ["java", "-jar", "/app/spring-boot-security-jwt.jar"]
