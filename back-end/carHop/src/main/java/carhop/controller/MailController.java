package carhop.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import carhop.model.MailMessage;
import carhop.service.MailService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class MailController {
	
	@Autowired
	private MailService notificationService;
	


	@PostMapping(value = "/send-mail")
	@PreAuthorize("permitAll()")
	public String send(@Valid @RequestBody MailMessage mail) {
		
		MailMessage message = new MailMessage(mail.getEmailAddress(),
				 			 				  mail.getSubject(),
				 			 				  mail.getBodyText());

		try {
			notificationService.sendEmail(message);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		return "Congratulations! Your mail has been send to the user.";
	}

}
