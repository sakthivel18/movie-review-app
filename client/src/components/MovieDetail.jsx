import React from 'react';
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieDetails = () => {
    const imageSrc = require("../images/image1.jpg");
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Movie Details
                            <span style={{float: 'right'}}>
                                <Button size="large" variant="outlined" sx={{color:"#000000", borderColor:"#000000"}}><ModeEditOutlineIcon/></Button>
                                <Button className="m-2" variant="outlined" sx={{color:"#000000", borderColor:"#000000"}} size="large"> <DeleteIcon/> </Button>
                            </span>
                            </h3>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4">
                            <img src={imageSrc} alt={"Card image cap" + Math.random()} className="" />
                        </div>
                        <div className="col-md-8" style={{justifyContent: 'start'}}>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Movie title: </b></h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Movie description: </b></h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Director: </b></h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Genre: </b></h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Language: </b></h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Rating: </b></h6></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card mt-2">
                        <div className="card-header"> 
                            <div className="row d-flex">
                                <div className="col-md-10">
                                    <h6 className='mt-2'>Reviews</h6>
                                </div>
                                <div className="col-md-2"><Button>Add review</Button> </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-10">
                                        <div className="row" style={{fontWeight: 'bold'}}> Author: </div>
                                        <div className="row" style={{fontWeight: 'bold'}}> Posted on: </div> 
                                        <div className="row"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                                        </div>
                                        <div className="col-md-2 d-flex">
                                            <Button sx={{color:"#ff1a1a", borderColor:"#000000"}} size="small"> <FavoriteIcon/> </Button>
                                            <Button sx={{color:"#000000", borderColor:"#000000"}} size="small"> <DeleteIcon/> </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MovieDetails;