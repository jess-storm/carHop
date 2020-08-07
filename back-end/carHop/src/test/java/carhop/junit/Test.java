package carhop.junit;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.boot.test.context.SpringBootTest;

import carhop.model.MailMessage;

@SpringBootTest
class Test {

		
	@org.junit.jupiter.api.Test  
	    public void testAPIConnection(){  
		 get("http://localhost:8080/profile/findAll");   
		 get("http://localhost:8080/requested_trips");   
		 get("http://localhost:8080/outgoing_trips");   
		 get("http://localhost:8080/reviews/8/user");    
	    }  
	 
	@org.junit.jupiter.api.Test 
	    public void testRegister(){  
		 get("http://localhost:8080/auth/register");

	    }  
	 
	@org.junit.jupiter.api.Test  
	    public void testAPIConnectionThirdParty(){  
		 get("https://covidtracking.com/api/v1/us/daily.json");  

	    }
	
	@org.junit.jupiter.api.Test  
    public void testMail(){  
		MailMessage mail = new MailMessage( "jessica.yielding@gmail.com",  "test", "this is an email");
		assertEquals("jessica.yielding@gmail.com",mail.getEmailAddress());
		assertEquals("test",mail.getSubject());
		assertEquals("this is an email",mail.getBodyText());
	}
}
