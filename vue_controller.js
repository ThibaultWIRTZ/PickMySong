/* Principal vuejs file */

function setData(){
    return {
        loading:false,           //Bool : True if the application load something
        errored:false,           //Bool : True if there is an error
        errorText:"",            //String : If there is an error that make the work of the application not work properly store the message        
        
        //Pages indicator
        albumDetails:false,      //Boolean : True to display release details
        artistDetails:false,     //Boolean : True to display artist details
        
        //Responses
        responseData:"",         //Array : Get the response of the ajax methos that get artists or releases
        artistDetailResponse:"", //Array : Get the response of the ajax method that get the details of an artist
        albumDetailResponse:"",  //Array : Get the response of the ajax method that get the details of a release
        artistReleasesDetails:[],//Array : Details of every songs of an artist
        images:[],               //Array : Get the sources of covers
        
        isImages:[],             //Array : If everything if loaded, the number of booleans in this array equals the number of element in 'images'
        albumCoverSrc:"",        //String : Source of the cover which will be displayed
        searchString:"",         //String : Content of the search bar
        searchStringDisplay:'',  //String : Content will display what the user researched
        searchType:"release",    //String : Type selected in the dropdown
        errorInput:false,        //Boolean : True if the search bar is empty        
        previousPosition:0,      //Integer : Contain the position on the window of the element we cicked
        isDetail:''              //Boolean : True if artists details
    }
}

var app = new Vue({
    el:"#application",
    data:setData(),

    methods:{
        backHome(){
            Object.assign(this.$data, setData());          
        },

        getInfo(){
            //Get information from musicbrainz if there is something in the input            
                this.loading=true;

                axios
                .get('https://musicbrainz.org/ws/2/'+this.searchType+'?query='+this.searchString)
                .then(response=>{
                    this.responseData=response.data;
                    if(this.responseData.releases){
                        this.initImages(response.data);
                    }                    
                })
                .catch(error=>{
                    this.errored=true;
                    this.errorText=error.message;                    
                })
                .finally( () => {
                    if(!this.responseData.releases){
                        this.loading=false;
                    }               
                })
        },

        preventRefresh(event){
            //Prevent the page refresh
            //params : event = event that was triggered
                event.preventDefault();
        },

        search(){     
            //Search information and dispay it
                this.responseData="";
                this.preventRefresh(event);
                if(this.checkIfSet(this.searchString)){                
                    this.errorInput=false;
                    if(this.checkIfSet(this.searchType)){    
                        this.errorDropdown=false;                    
                        this.getInfo();
                        this.updateInfo();
                    }else{                                
                        this.errorDropdown=true;
                        alert("Veuillez renseigner le type");
                    }
                }else{                
                    this.errorInput=true;
                    alert("Veuillez remplir le champ de saisie");         
                }                 
        },

        updateInfo(){
            //Display what the user searched
                this.searchStringDisplay = this.searchString;
        },

        setType(){
            //Set type of search
                this.searchType = this.$refs.components.typeselected;
        },

        checkIfSet(variable){
            //Look if a variable is empty or null
            //params : variable = variable that will be checked
            //return : bool
                if(variable.trim()!="" && variable.trim()!=null){
                    return true;
                }
                return false;
        },
        getImage(elementId){
            //Get the cover of a release and store it in images
            //params : elementId = unique id of a release, id = id of the element in 'images'
            //return : none
                return new Promise((res,rej)=>{
                    axios
                    .get('https://coverartarchive.org/release/'+elementId)
                    .then(response=>{                    
                        res(response);
                    })
                    .catch(error=>{
                        rej(error.message);
                    })
                });
        },
        initImages(variable){
            //Initalize an array of images, set a default image and load images if there's a cover            
                this.loading=true;
                this.images=[];
                this.isImages=[];                
                
                variable.releases.forEach(() => {
                    this.images.push('https://www.centrepompidou.fr/media/picture/c7/9c/c79c719092811639f7b5fcbc6f9488f9/dzi/image_files/10/1_1.jpg');
                });

                variable.releases.forEach((element,id) => {
                    this.getImage(element.id)
                    .then(res=>{
                        this.images[id] = res.data.images[0].thumbnails.small;
                    })
                    .finally(()=>{
                        this.isImages.push(true); 
                    });                  
                });
        },
        displayReleaseDetails(releaseId,imgSrc){
            //Display release details and set the position of the element clicked
                this.previousPosition = window.scrollY;
                this.albumCoverSrc=imgSrc;
                this.getReleaseDetails(releaseId).then(rej=>{
                    if(this.artistDetails==true){
                        this.artistDetails=false;
                        this.isDetail=true;                                                
                    }
                    this.albumDetailResponse=rej.data;
                    this.albumDetails=true;
                    this.scrollToTop();
                });      
        },
        getReleaseDetails(releaseId){
            //Get album information and tracks
            //params : releaseId = id of the release                
                return new Promise((res,rej)=>{
                    this.loading=true;    
                    axios
                    .get('https://musicbrainz.org/ws/2/release/'+releaseId+'?inc=recordings+artists')
                    .then(response=>{
                        res(response)
                    }).catch(error=>{
                        rej(error.message);
                    }).finally(()=>{
                        this.loading=false;
                    })
                })                
        },
        backToArtistResult(){
            //Display previous result
                this.artistDetails=false;
                setTimeout(()=>{
                    this.previousPosition=0;
                },1);          
        },
        backToReleaseResult(){
            //Display previous result
                this.albumDetails=false;
                if(this.isDetail){
                    this.isDetail=false;
                    this.artistDetails=true;                                        
                }
                setTimeout(()=>{
                    this.previousPosition=0;
                },1);
        },
        scrollToTop() {
            //Scroll to the top of the window
                window.scrollTo(0,0);
        },
        scrollToStoredItem(){
            //Scroll to a specific item in a list           
                window.scrollTo(0,this.previousPosition);                
        },
        displayArtistDetails(artistId){
            // Display every releases of the artist
            // params : artistId = id of the artist wanted            
                this.getArtistDetail(artistId)
                .then(response=>{           
                    this.previousPosition = window.scrollY;                    
                    this.artistDetailResponse = response.data;
                    this.initImages(response.data);
                    this.artistDetails=true;                    
                });
        },
        getArtistDetail(artistId){
            // Find details about an artist by his id
            // params : artistId = id of an artist
            // return : information about an artist by his id
                return new Promise((res,rej)=>{
                    axios
                    .get("http://musicbrainz.org/ws/2/artist/"+artistId+"?inc=releases")
                    .then(response=>{
                        res(response);
                    }).catch(error=>{
                        rej(error.message);
                    })
                });
        }        
    },
    computed:{
        everythingIsLoaded:function(){
            //Check if every image is loaded
                if(this.isImages.length==this.images.length){
                    this.loading=false;
                    return true;
                }
                return false;
        }
    },
    updated() {
        //Scroll to previous position
            if(this.responseData.releases && !this.albumDetails){
                this.scrollToStoredItem();                
            }
    }    
})