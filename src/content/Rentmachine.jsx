import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState  } from 'react';
import { useFirebase } from '../context/firebase';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
// import axios from "axios";

const Rentmachine = () => {
const [Machinename,setMachine]=useState("");
const [Location,setlocation]=useState("");
const [ Availablity,setAvailability]=useState("");
const [RentPrice,setRentPrice]=useState("");
const [OwnerId,setOwnerId]=useState("");
const [imageFile, setImageFile] = useState(null);
const [imageUrl, setImageUrl] = useState("");
const [loading, setLoading] = useState(false);
const [uploadingImage, setUploadingImage] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
// const [img,setimg]=useState("");
 const { addMachineData, user } = useFirebase();
  // Function to upload image to Cloudinary
 const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "agrirent");
    formData.append("cloud_name", "dvm0kbwo4");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dvm0kbwo4/image/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

   const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAlert({
        show: true,
        message: 'Please select a valid image file',
        variant: 'danger'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        show: true,
        message: 'Image size should be less than 5MB',
        variant: 'danger'
      });
      return;
    }

     setUploadingImage(true);
    setImageFile(file);

    try {
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
      setAlert({
        show: true,
        message: 'Image uploaded successfully!',
        variant: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to upload image. Please try again.',
        variant: 'danger'
      });
    } finally {
      setUploadingImage(false);
    }
  };

const handlesubmit=async (e)=>{
     e.preventDefault();

     if (!Machinename || !Location || !Availablity || !RentPrice) {
      setAlert({
        show: true,
        message: 'Please fill in all fields',
        variant: 'danger'
      });
      return;
    }

    setLoading(true);


     
   const machineData = {
      machineName: Machinename,
      location: Location,
      availability: Availablity,
      rentPrice: parseFloat(RentPrice),
      owner: OwnerId,
      status: 'available',
      imageUrl: imageUrl || 'https://via.placeholder.com/300x250?text=Agricultural+Machine'
    };

    try {
      const result = await addMachineData(machineData);
      
      if (result.success) {
        setAlert({
          show: true,
          message: 'Machine data has been stored successfully!',
          variant: 'success'
        });


       setMachine("");
       setlocation("");
       setAvailability("");
       setRentPrice("");
       setOwnerId("");
       setImageFile(null);
       setImageUrl("");
         setTimeout(() => {
          setAlert({ show: false, message: '', variant: 'success' });
        }, 5000);
        
      } else {
        setAlert({
          show: true,
          message: `Error storing data: ${result.error}`,
          variant: 'danger'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: `Error: ${error.message}`,
        variant: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };
//   const file= e.target.files[0];
// //  if(!file) return

//  const data = new FormData()
//  data.append("file",file);
//  data.append("uplod_preset","agrirent")
//  data.append("cloude_name ", " dvm0kbwo4")

// const res = await fetch(" https://api.cloudinary.com/v1_1/dvm0kbwo4/image/upload",{
//     method:"POST",
//     body:data
// })
//  const uplodImgURL=await res.json()
//  console.log(uplodImgURL.url)


// }

  return (
    <div   className='mt-3 '>
        <hr className='h-5' />
           {/* Alert Component */}
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: '', variant: 'success' })}>
          {alert.message}
        </Alert>
      )}
        <div className="text-center mb-4">
        <h2 className="text-primary">List Your Machine</h2>
        <p className="text-muted">Add your agricultural equipment to our rental platform</p>
       <p className='text-muted mx-auto'>  <ul className='flex gap-2 mx-auto'>for any Help ?.-
            <li>{'{@_contact us : 8960960121}' } ;</li>
           <li>{'{@_email : nikhilgupta542006@gmail.com}'}</li>
      </ul></p>
      </div>
     


         <Form onSubmit={handlesubmit}>
            
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Machine Type</Form.Label>
        <Form.Control onChange={(e)=>setMachine(e.target.value)} value={Machinename} type="text" placeholder="Enter Machine type" />
        
      </Form.Group>
        <Form.Label>Location of Machine</Form.Label>
        <Form.Control onChange={(e)=>setlocation(e.target.value)} value={Location} type="text" placeholder="Enter location of machine " />
        
      

      <Form.Group className="mb-3" controlId="formBasicAvailablity">
        <Form.Label>Availablity</Form.Label>
        <Form.Control onChange={(e)=>setAvailability(e.target.value)} value={Availablity} type="text" placeholder="for which time Machine will be avilable EX:(September to Octuber)" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRentPrice">
        <Form.Label>Rental Price</Form.Label>
        <Form.Control onChange={(e)=>setRentPrice(e.target.value)} value={RentPrice} min={"0"} type="number"  placeholder="Machine Rent price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicOwnernId">
        <Form.Label>Owner Id</Form.Label>
        <Form.Control onChange={(e)=>setOwnerId(e.target.value)} value={OwnerId}  type="text"  placeholder="Any vaild Government Id" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicImage">
             <Form.Label>Machine Image</Form.Label>
             <Form.Control 
               onChange={handleImageChange}
               type="file" 
               accept="image/*"
               required
             />
             {uploadingImage && <p className="text-info">Uploading image...</p>}
             {imageUrl && (
               <div className="mt-2">
                 <img 
                   src={imageUrl} 
                   alt="Preview" 
                   style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                   className="rounded border"
                 />
                 <p className="text-success mt-1">✓ Image uploaded successfully</p>
               </div>
             )}
           </Form.Group>

              <Button 
         variant="primary" 
         type="submit" 
         disabled={loading || uploadingImage}
       >
         {loading ? 'Storing...' : (uploadingImage ? 'Uploading image...' : 'List your Machine')}
       </Button>
    </Form> 
    

   
   

    


      {/* <form  onChange={handlesubmit}>
        <Form.Group  className="mb-3" controlId="formBasicEquipment">
        <Form.Label>equipment img</Form.Label>
        <Form.Control onChange={(e)=>setimg(e.target.value)} value={img} min={"0"} type="file"  placeholder="Equipment img" />
      </Form.Group>

      <Button variant="primary" type="submit">
       uplode img
      </Button>

      </form> */}


    </div>
  )
}

export default Rentmachine
