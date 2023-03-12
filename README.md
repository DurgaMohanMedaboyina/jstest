Welcome to the Application,

Brief Flow:

This is an interface between Teacher and Students. Teacher would frame a set of questions in his login.

Students would be able to view the questions in their login's and submit their responses .

Responses,thus submitted are visible in teacher's Login.

Features :

Login Component:

User can Sign up and then login
Incase,
existing user signs up again, error would be thrown
Non-existing user login's, error would be thrown
User name is correct but password is wrong error would be thrown

Note: Once student/teacher logs in, username and role would be stored in the local storage. Unless logged in persons logs out, app does not allow another user to log in. App redirects to student/teacher component based on their role

Header Component:
User's name, role and logout button appears.


Once user logs out, logged user and role data on the local storage gets deleted.

Teacher's Component:

There are three drop down menus from which teacher can frame the question and add it to the question board.
Instantly answer would be displayed.

Student Responses board is visible in the same component as a window in the screen above 768px. Else, a text element with hyperlink appear under the header.Incase of no responses, same thing would be displayed.
Else, list of student names would appear as drop-down menu. Selection of candidates name displays the responses submitted.


Incase a student tries to access teachers path, he will be redirected back to his component


Student's Login:

Incase questions are not posted by teacher, default view for student is no questions posted

Incase questions are posted, same would be displayed.Student can write his answer and save it. Once, student reaches the last question submit question will appear. Once Student clicks the submit button, data will be stored.


If the student revisits his page again, previous responses would be shown along with an empty text area to edit his response. Once the responses are saved and submitted, teacher would view the latest response.


Application is placed at : https://mdmjstest.ccbp.tech/
