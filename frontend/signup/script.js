// // Wait for the form to be submitted
// document.getElementById('dataForm').addEventListener('submit', async function(event) {
//     event.preventDefault();  // Prevent default form submission

//     const dataInput = document.getElementById('dataInput').value;  // Get input value
//     const data = { data: dataInput };  // Prepare data as JSON

//     try {
//         console.log("our data form the backend is"+data);
//         // Send data to Django API endpoint
//         const response = await fetch('http://localhost:8000/api/sample/', { // Update URL as needed
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
            
//               // Convert data to JSON
//         });

//         // Process response from API
//         if (response.ok) {
//             const responseData = await response.json();
//             document.getElementById('responseMessage').textContent = responseData.message;
//         } else {
//             document.getElementById('responseMessage').textContent = 'Error: Could not process request';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('responseMessage').textContent = 'Error: Network issue or server is down';
//     }
// });


document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const signupData = {
        username: username,
        email: email,
        password: password
    };

    try {
        // Send data to the backend API
        const response = await fetch('http://localhost:8000/api/signup/', { // Update URL to your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        if (response.ok) {
            const responseData = await response.json();
            document.getElementById('responseMessage').textContent = "Signup successful!";
            document.getElementById('responseMessage').style.color = 'green';
        } else {
            document.getElementById('responseMessage').textContent = "Signup failed: " + response.statusText;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = "Network error or server is down";
    }
});

// JavaScript for handling the login button
document.getElementById('intra42-login-btn').addEventListener('click', async () => {
    try {
        // Fetch the Intra42 authentication URL from the backend
        const response = await fetch('http://localhost:8000/api/login_with_42/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Extract the URL and redirect the user
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Intra42 authentication page
            } else {
                console.error('URL not found in response');
            }
        } else {
            console.error('Failed to fetch authentication URL');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
