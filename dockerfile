# Use a Java image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the jar (replace with your actual jar file name)
COPY target/*.jar app.jar

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
