FROM openjdk:17-alpine
ADD target/hello-0.0.1-SNAPSHOT.war hello.war
ENTRYPOINT [ "java", "-jar", "hello.war" ]
