fetchAllBlog();

async function fetchAllBlog() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();

        let blogListHTML = "";
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

            blogListHTML += `
                <li class="list-group-item">
                    <h2>${blog.title}</h2> <br>
                    <p><span class="date"> ${blog.author} | ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span> </p>                    
                    <p>${content} <p> 
                    <a href="post.html" >read more</a>
                    <p>Tags : ${strTags} <p> 

                </li>
            `
        }

        document.getElementById('blog-list').innerHTML = blogListHTML;
    } catch(error) {
        console.log(error)
    }   
}