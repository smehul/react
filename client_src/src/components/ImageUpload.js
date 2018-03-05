import React, {Component} from 'react';

class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} className="profile-pic"/>);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        
        <div className="previewComponent">
            <div className="imgPreview">
                {$imagePreview}
            </div>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} ref="img" name="img"/>          
        </div>
        
      )
    }
  }
export default ImageUpload;