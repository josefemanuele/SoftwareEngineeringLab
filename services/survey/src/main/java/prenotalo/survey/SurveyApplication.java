package prenotalo.survey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SurveyApplication {
	public static void main(String[] args) {
		SpringApplication.run(SurveyApplication.class, args);
	}

	@GetMapping("/")
	public String index() {
		return "Survey microservice";
	}
}
