// Function to fetch and display blogs
async function fetchAllBlog() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();

        let blogTableHTML = `<table>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Action</th>
            </tr>`;

        for (let blog of blogs) {
            let blogDate = new Date(blog.date);
            let strTags = "";

            if (blog.tags) {
                for (let tag of blog.tags) {
                    strTags += tag + ", ";
                }
            }

            strTags = strTags.slice(0, -2);

            blogTableHTML += `
                <tr>
                    <td>${blog.title}</td>
                    <td>${blog.author}</td>
                    <td>${strTags}</td>
                    <td>${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</td>
                    <td> <a href="update-post.html?id=${blog._id}">Update</a> <a href="#" data-id="${blog._id}" class="delete-links">Delete</a></td>
                </tr>`;
        }

        blogTableHTML += `</table>`;
        document.getElementById('blog-list').innerHTML = blogTableHTML;

        // Now that the blogs are added, attach event listeners to delete links
        attachDeleteEventListeners();
    } catch (error) {
        console.log(error);
    }
}

// Function to attach event listeners to delete links
function attachDeleteEventListeners() {
    // Get all delete links
    const deleteLinks = document.getElementsByClassName('delete-links');

    // Attach click event listeners to each delete link
    for (const deleteLink of deleteLinks) {
        deleteLink.addEventListener('click', function (event) {
            event.preventDefault();
            const blogId = event.target.dataset.id;
            deleteBlogPost(blogId);
        });
    }
}

// Function to delete a blog post
async function deleteBlogPost(blogId) {
    try {
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If successful, reload the blog list
        fetchAllBlog();
    } catch (error) {
        console.log('Error:', error);
    }
}

// Fetch and display blogs when the page loads
fetchAllBlog();
