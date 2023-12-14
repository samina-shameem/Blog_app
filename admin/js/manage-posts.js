fetchAllBlog();

async function fetchAllBlog() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();

        let blogTableHTML = `<table >
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Tags</th>
    <th>Date</th>
    <th>Action</th>
  </tr>  
`;
        for (let blog of blogs) {          
          
          console.log(blog);

            let content = blog.content.substring(0, 100);
            // let content = blog.content;
            let blogDate = new Date(blog.date)
            let strTags = "";
            if (blog.tags){
                for (let tag of blog.tags) {
                    strTags += tag + ",";
                }
            }

            strTags = strTags.slice(0,-1);
            blogTableHTML += `
                <tr>
                    <td>${blog.title}</td>
                    <td>${blog.author}</td>
                    <td>${strTags}</td>
                    <td>${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</td>
                    <td> <a href="update-pun.html?id=${blog._id}">Update</a> - <a href="#" data-id="${blog._id}" class="delete-links">Delete</a></td>
                </tr>`

            // blogListHTML += `
            //     <li class="list-group-item">
            //         <h2>${blog.title}</h2> <br>
            //         <p><span class="date"> ${blog.author} | ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span> </p>                    
            //         <p>${content} <p> 
            //         <a href="#">read more</a>
            //         <p>Tags : ${strTags} <p> 

            //         <div>
            //             <a href="update-pun.html?id=${blog._id}">Update</a> |
            //             <a href="#" data-id="${blog._id}" class="delete-links">Delete</a> 
            //         </div>
            //     </li>
            // `
        }

        blogTableHTML += `</table>`;
        document.getElementById('blog-list').innerHTML = blogTableHTML;
    } catch(error) {
        console.log(error)
    }   
}