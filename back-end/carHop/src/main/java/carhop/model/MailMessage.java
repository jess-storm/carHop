package carhop.model;
import org.springframework.stereotype.Component;

@Component
public class MailMessage {

	private String emailAddress;
	private String subject;
	private String bodyText;

	
	public MailMessage() {}
	public MailMessage(String emailAddress, String subject, String bodyText) {
		super();
		this.emailAddress = emailAddress;
		this.subject = subject;
		this.bodyText = bodyText;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBodyText() {
		return bodyText;
	}

	public void setBodyText(String bodyText) {
		this.bodyText = bodyText;
	}

}
