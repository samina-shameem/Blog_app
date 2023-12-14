document.getElementById('blogPostForm').addEventListener('submit', createPost);

async function createPost(event) {
    event.preventDefault();

    let form = event.target;

    // Form validation
    if (!form.checkValidity()) {
        alert('Please fill out all required fields.');
        return;
    }

    try {
        let formData = new FormData(form);
        let data = {
            "title": formData.get('title'),
            "author": formData.get('author'),
            "content": formData.get('content'),
            "tags": formData.getAll('tags'), 
        };
        console.log(data);
        // Perform the POST request using async/await
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        location.replace('admin.html');

    } catch (error) {
        console.log(error)
    }
}

