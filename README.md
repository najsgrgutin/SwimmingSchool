# SwimmingSchool

Bazna adresa za manipulaciju korisnicima je http://127.0.0.1:8000/api/v1/users/ .
Za login je endpoint login/ i prima parametre (username, password).
Za registraciju je endpoint registration/ i prima parametre (email, username, password).
Za provjeru username-a je endpoint check_username/ i prima (username).
Za provjeru email-a je endpoint check_email/ i prima (email).
Za promjenu passworda je endpoint change_password i prima (old_password, new_password). -> Potrebna autorizacija (u header requesta dodati Authorization: Token <token>)
