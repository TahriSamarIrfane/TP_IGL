import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import'../index.css';

//importation for the slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//import images
import man1 from'../assets/images/man1.png';



const apiurl = "http://127.0.0.1:8000"

// Function to get the CSRF token from cookies
const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
  
    const handleRatingChange = (currentRating) => {
      setRating(currentRating);
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    // const loginUser = async (username, password) => {
    //   try {
    //     const response = await fetch(`${apiurl}/login/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username: username,
    //         password: password,
    //       }),
    //     });
  
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       const token = data.csrftoken; // Assuming the token is included in the response
    //       //console.log('Login successful. Token:', token);
    //       return token;
    //     } else {
    //       console.error('Error logging in:', response.statusText);
    //       console.error('Response:', data);
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error logging in:', error.message);
    //     return null;
    //   }
    // };
  
    const handleSubmit = async () => {
      try {
        const username = 'boutylao';
        const password = '1234567';
  
        // Perform login only once
        //const token = await loginUser(username, password);
        const basicAuthCredentials = btoa(`${username}:${password}`);
        //console.log(token)
  
        //if (token) {

          const response = await fetch(`${apiurl}/submit-feedback/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${basicAuthCredentials}`,
            },
            body: JSON.stringify({
              stars: rating,
              comment: comment,
            }),
          });
          
          if (response.ok) {
            console.log('Feedback submitted successfully');
            // Add any additional logic or feedback to the user
          } else {
            console.error('Error submitting feedback:', response.statusText);
            // Handle error and provide feedback to the user
          }
        // } else {
        //   console.error('Login failed');
        //   // Handle login failure...
        // }
      } catch (error) {
        console.error('Error submitting feedback:', error.message);
        // Handle error and provide feedback to the user
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="bg-white flex flex-col md:flex-row items-center justify-between">
          {/* the left side */}
          <div className="md:w-1/2 flex-shrink-0">
            <img
              className="right-0 lg:mt-5 w-[320px] h-[300px] md:h-[570px] md:w-[600px]"
              src={man1}
              alt=""
            />
          </div>
  
          {/* the right side */}
          <div className="md:w-1/2 px-2 ml-24 md:ml-0">
            <div className="px-10 pb-5 pt-5 mr-48 md:mr-48 w-[81%] bg-lightGrey md:shadow-xl rounded-2xl">
              <p className="font-bold text-black text-4xl text-center">Que Pensiez-Vous ?</p>
              <p className="text-black mt-3 ml-4 text-center">
                Votre avis est important pour nous aider à mieux comprendre vos besoins et à adapter
                notre service en conséquence
              </p>
              <div className="mb-10">
                <div className="flex flex-row items-center justify-center mb-7">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          className="opacity-0"
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => handleRatingChange(currentRating)}
                        />
                        <FaStar
                          size={40}
                          className="text-grey cursor-pointer"
                          id="stars"
                          name="stars"
                          color={currentRating <= (hover || rating) ? '#ffc107' : '#8A8785'}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                          required
                        />
                      </label>
                    );
                  })}
                </div>
                <form className="flex flex-col space-y-4" id="FeedbackForm" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />
                  <div className="">
                    <textarea
                      type="text"
                      id="comment"
                      name="comment"
                      placeholder="Add a Comment..."
                      value={comment}
                      onChange={handleCommentChange}
                      className="shadow-lg resize-none bg-gray-100 outline-none ring-1 ring-gray-300 w-full h-32 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200"
                    ></textarea>
                  </div>
                  <button
                    className="shadow-md inline-block self-end bg-darkPink text-white font-bold rounded-2xl px-6 py-2 w-full"
                    type="submit"
                    name="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Feedback;
