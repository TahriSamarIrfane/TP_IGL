# from selenium import webdriver
# driver= webdriver.Edge(SELENIUM_EXECUTABLE_PATH="C:\\Users\\Morsi Store DZ\\edgedriver_win64")
# driver.get("http://localhost:5173/Moderateur")
# driver.quit()
import logging
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

username="Mint"
password="12345"



# Specify the path to the Microsoft Edge WebDriver executable
edge_driver_path = 'C:\\Users\\Morsi Store DZ\\edgedriver_win64\\msedgedriver.exe'  # Replace with your actual path

# Create the Edge WebDriver instance
driver = webdriver.Edge(executable_path=edge_driver_path)

# Navigate to a website
driver.get('http://localhost:3000/')

link = driver.find_element_by_link_text("Se Connecter")
link.click()
driver.find_element_by_name("Pseudo").send_keys(username)
driver.find_element_by_name("MotdePasse").send_keys(password)
link = WebDriverWait(driver, 40).until(
    EC.presence_of_element_located((By.ID, 'login'))
)
link.click()

link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'search'))
)


link.click()
driver.implicitly_wait(10)
# Cas 'Pas de resultat trouvés'
element= driver.find_element_by_name("searchBar")
element.send_keys("Test")
link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'search')) 
)
 
link.click()
element.clear()
# Cas 'Resultat trouvés'
element.send_keys("Teach Software Modeling")
link = WebDriverWait(driver, 10).until(
     EC.presence_of_element_located((By.ID, 'search'))
 )

link.click()
##Filtrer par mot clé
input = driver.find_element_by_name("search_kwords")
input.send_keys("AI")

link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'kw_s'))
)

link.click()
##Filtrer par autheur
input = driver.find_element_by_name("search_auth")
input.send_keys("Edward Boole")
link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'aut_s'))
) 
link.click()

##Filtrer par institutions
input = driver.find_element_by_name("search_instit")
input.send_keys("OxFord")
link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'in_s'))
)
link.click()

##Filtrer par date
date_picker = driver.find_element_by_id("dateF_s")
date_picker.click()
calendar = driver.find_element_by_class_name("react-datepicker")
selected_date = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located(( By.XPATH, "//*[@id='root']//div//div[2]//div[2]//div//div[8]//div[1]//div[2]//div[2]//div//div//div[2]//div[2]//div[4]//div[3]" ))
)
selected_date.click()

date_picker = driver.find_element_by_id("dateT_s")
date_picker.click()
calendar = driver.find_element_by_class_name("react-datepicker")
selected_date = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located(( By.XPATH, "//*[@id='root']//div//div[2]//div[2]//div//div[8]//div[2]//div[2]//div[2]//div//div//div[2]//div[2]//div[4]//div[5]"))
) 
selected_date.click()

link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, 'filtrer'))
)
link.click()


# Do additional Selenium actions as needed
time.sleep(10)
# Close the browser window
driver.quit()




