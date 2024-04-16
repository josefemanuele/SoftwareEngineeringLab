FROM maven:3-eclipse-temurin-17-alpine AS service-build
WORKDIR /app

COPY pom.xml .
RUN mvn verify --fail-never

COPY . .
RUN mvn package

FROM openjdk:17-alpine
WORKDIR /app

COPY --from=service-build /app/target/pay-1.0.0.jar /app/pay.jar

ENTRYPOINT [ "java", "-jar", "/app/pay.jar" ]
