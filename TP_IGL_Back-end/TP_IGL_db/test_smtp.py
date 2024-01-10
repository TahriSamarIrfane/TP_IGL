import smtplib
from email.mime.text import MIMEText

# Remplacez ces valeurs par vos propres paramètres
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'lh_bayadh@esi.dz'
EMAIL_HOST_PASSWORD = 'hadjer2803'

# Établir une connexion SMTP
server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
server.starttls()

# S'authentifier avec le serveur SMTP
server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)

# Fermer la connexion
server.quit()
