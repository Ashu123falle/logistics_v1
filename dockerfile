
# Start from a Maven image with JDK 17
FROM maven:3.9.4-eclipse-temurin-17 as builder

WORKDIR /app
COPY . .

# Build the application and create the jar
RUN mvn clean package -DskipTests

# Use a minimal JDK image for running the app
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
