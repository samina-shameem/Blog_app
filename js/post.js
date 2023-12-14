console.log('Query string:',  location.search);
const urlParams = new URLSearchParams(location.search)
console.log(urlParams.get('id'))

fetchPost();

async function fetchPost() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        const blog = await response.json();
        console.log(blog);

        let blogDate = new Date(blog.date)
        let strTags = "";
        if (blog.tags){
            for (let tag of blog.tags) {
                strTags += tag + ", ";
            }
        }
        strTags = strTags.slice(0,-2);



        document.getElementById('blog-post').innerHTML = 
        `<h2>${blog.title}</h2> 
        <p><span class="date"> ${blog.author} | ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span> </p>                    
        <p>${blog.content} <p>         
        <p>Tags : ${strTags} <p> 
        `
    } catch(error) {
        console.log(error)
    }  
}

