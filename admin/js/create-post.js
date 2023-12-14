// Fetch tags from the server
getTagsFromServer();

// expect other fileds from user, 
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
        
        const customTagsString = formData.get('customTags');
        const customTagsArray = [];
        if (customTagsString) {
            const customTags = customTagsString.split(',');
            for (let tag of customTags) {
                customTagsArray.push(tag.trim());
            }
        }
        tags = [...formData.getAll('tags'), ...customTagsArray];
        let data = {
            "title": formData.get('title'),
            "author": formData.get('author'),
            "content": formData.get('content'),
            "tags": tags 
        };
        // console.log(data);
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
        console.log('Error:', error);
    }
}



async function getTagsFromServer() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();

        // Initialize an empty array to store unique tags
        const uniqueTags = [];

        // Iterate over each blog post
        posts.forEach(post => {
            if (post.tags) {
                // Iterate over each tag in the blog post
                post.tags.forEach(tag => {
                    // Check if the tag is not already in the uniqueTags array
                    if (!uniqueTags.includes(tag)) {
                        // Add the tag to the array
                        uniqueTags.push(tag);
                    }
                });
            }
        });

        // Get the reference to the tags select element 
        const tagsSelect = document.getElementById('tags');

        // Iterate over uniqueTags and add options to the select element
        uniqueTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.text = tag;
            tagsSelect.add(option);
        });
    } catch (error) {
        console.log('Error fetching tags:', error);
    }
}
