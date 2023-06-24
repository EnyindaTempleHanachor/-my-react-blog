import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mr. Temple');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const blog = {title, body, author};

        setIsLoading(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            setIsLoading(false);
            history.push('/');
        });
    };

    return ( 
        <div className="newblog">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange = {(e)=> setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={body}
                    onChange = {(e)=> setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange = {(e)=> setAuthor(e.target.value)}
                >
                    <option value="Mr. Temple">Mr. Temple</option>
                    <option value="Mhiz Prudie">Mhiz Prudie</option>
                </select>
                {!isLoading && <button>Add Blog</button>}
                {isLoading && <button>Adding Blog...</button>}
                {isLoading && <button>New Blog Added</button>}
            </form>
        </div>
     );
}
 
export default NewBlog;