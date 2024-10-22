import React, {useRef, useState} from 'react'
import './ImageGenerator.css'
import girl_image from '../Assets/ai_girl_blue-eyes.jpg'
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null)
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await openai.images.generate(
    
            {
                model: "dall-e-3",
                prompt: inputRef.current.value,
                n: 1,
                size: "1024x1024", // Consistent image size
               
            
               
               }
         );
                   
            
      
        let data = await response.json();// Correctly extracting the image URL
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);

            console.log(data);
    }


  return (
      <div className='ai-image-generator'>
          <div className='header'>Ai image <span>generator</span>
          </div>
          <div className='img-loading'>
              <div className="image"><img src={image_url === "/" ? girl_image : image_url} alt="image" /></div>
              <div className="loading">
                  <div className={loading?"loading-bar-full":"loading-bar"}></div>
                  <div className={loading?"loading-text":"display-none"}>Loading...</div>
              </div>
          </div>
          <div className="search-box">
              <input type="text" className='search-input'ref={inputRef} placeholder='Describe What You Want To See' />
              <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
          </div>
    </div>
  )
}


export default ImageGenerator;