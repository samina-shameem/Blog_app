// Fetch blog post details based on the ID from the URL
const urlParams = new URLSearchParams(location.search);
const postId = urlParams.get('id');

// Check if postId is available
if (postId) {
    fetchBlogPost(postId);    
    getTagsFromServer();
} else {
    alert('Invalid URL. Please provide a valid blog post ID.');
}

// Add event listener to the update form
const updatePostForm = document.getElementById('updatePostForm');
updatePostForm.addEventListener('submit', function (event) {
    event.preventDefault();
    updatePost(postId);
});

// Function to fetch blog post details for updating
async function fetchBlogPost(postId) {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
        const blogPost = await response.json();

        // Populate the form with the existing blog post data
        document.getElementById('title').value = blogPost.title;
        document.getElementById('author').value = blogPost.author;
        document.getElementById('content').value = blogPost.content;

        // Select the existing tags for the blog post
        if (blogPost.tags) {
            const tagsSelect = document.getElementById('tags');
            for (let tag of blogPost.tags) {
                const option = tagsSelect.querySelector(`option[value="${tag}"]`);
                if (option) {
                    option.selected = true;
                } else {
                    // If a tag is not in the current options, add it
                    const newOption = document.createElement('option');
                    newOption.value = tag;
                    newOption.text = tag;
                    newOption.selected = true;
                    tagsSelect.add(newOption);
                }
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

// Function to update a blog post
async function updatePost(postId) {
    try {
        const updatePostForm = document.getElementById('updatePostForm');
        const formData = new FormData(updatePostForm);

        const customTagsString = formData.get('customTags');
        const customTagsArray = [];
        if (customTagsString) {
            const customTags = customTagsString.split(',');
            for (let tag of customTags) {
                customTagsArray.push(tag.trim());
            }
        }
        tags = [...formData.getAll('tags'), ...customTagsArray];

        const data = {
            "title": formData.get('title'),
            "author": formData.get('author'),
            "content": formData.get('content'),
            "tags": tags
        };

        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
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
