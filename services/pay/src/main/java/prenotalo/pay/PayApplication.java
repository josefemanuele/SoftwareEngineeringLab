package prenotalo.pay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class PayApplication {
	public static void main(String[] args) {
		SpringApplication.run(PayApplication.class, args);
	}

	@GetMapping("/")
	public String index() {
		return "Payment microservice";
	}
}
