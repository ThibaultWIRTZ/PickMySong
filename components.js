/* File that enumerate every component which will be used in vuejs file */

//Spinner
Vue.component('spinner',{
    template: `
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    `
})

//Dropdown type selector
Vue.component('typeselector',{    
    template: `
    <select class="form-control" v-model:bind="typeselected" v-on:change="$emit('newtype')">
        <option v-for="type in types" v-bind:value="type.val">{{ type.display }}</option>
    </select>
    `,
    data(){
        return {
            types:[{display:"Titre",val:"release"},{display:"Artiste",val:"artist"}],
            typeselected:"release"
        }
    }
})

//Display artist response
Vue.component('contentartists',{
    props:['artists'],
    template: `
    <table class="table table-striped table-dark">            
        <thead>
            <tr>
            <th scope="col">Name</th>                        
            <th scope="col">Type</th>
            <th scope="col">Région</th>
            <th scope="col">Début</th>
            <th scope="col">Fin</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in artists" class="clickable">
                <td>{{ item.name }} <i v-if="item.disambiguation">({{ item.disambiguation }})</i> </td>
                <td><div v-if="item.type"><i :class="type( item.type )"></i></div></td>
                <td><div v-if="item.area"><i :class="flag(item.area.name)"></i></div></td>
                <td><div v-if="item['life-span']">{{ item['life-span'].begin }}</div></td>   
                <td><div v-if="item['life-span']">{{ item['life-span'].end }}</div></td>
            </tr>
            <div v-if="artists.length==0">Aucun resultat.</div>
        </tbody>  
    </table>  
    `,
    methods:{
        type:function(type){
            if(type=='Person'){
                return "fas fa-user";
            }else if(type=="Group"){
                return "fas fa-users";
            }
        },
        flag:function(country){
            return country + " flag";
        }
    }
})

//Display release response
Vue.component('contentreleases',{
    props:['releases','images'],
    template: `
    <table class="table table-striped table-dark">            
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Titre</th>
                <th scope="col">Type</th>
                <th scope="col">Nombre de piste</th>                      
                <th scope="col">Auteur</th>
                <th scope="col">Date sortie</th>
                <th scope="col">Format</th>
                <th scope="col">Langage</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in releases" v-on:click="$emit('getalbumdetails',item.id,images[i])" class="clickable">
                <td><img v-if="images[i]" :src="images[i]"/></td>
                <td><div v-if="item.title">{{ item.title }}</div></td>
                <td><div v-if="item['release-group']">{{ item['release-group']['primary-type'] }}</div></td>
                <td><div v-if="item['track-count']">{{ item['track-count'] }}</div></td>
                <td><div v-if="item['artist-credit'][0]">{{ item['artist-credit'][0].artist.name }}</div></td>                
                <td><div v-if="item.date">{{ item.date }}</div></td>
                <td><div v-if="item.media">{{ item.media[0].format }}</div></td>   
                <td><div v-if="item['text-representation']">{{ item['text-representation'].language }}</div></td>
            </tr>
            <div v-if="releases.length==0">Aucun resultat.</div>                             
        </tbody>  
    </table>  
    `,
    methods: {

    },
})

//Display release response
Vue.component('albumdetails',{
    props:['albumdetails','coversrc'],
    template: `
        <div>
            <div class="w-100 d-inline-flex align-items-center justify-content-around">
                <img :src="coversrc"/>                
                <div class="row">
                    <div class="col">
                        <div class="row">Album : </div>
                        <div class="row">Artiste : </div>
                        <div class="row">Date de création : </div>
                    </div>
                    <div class="col">
                        <div class="row"><div v-if="albumdetails.title">{{albumdetails.title}}</div></div>
                        <div class="row"><div v-if="albumdetails['artist-credit']">{{albumdetails['artist-credit'][0].artist.name}}</div></div>
                        <div class="row">{{albumdetails.date}}</div>
                    </div>
                </div>                
            </div>

            <div>
                <h2>{{ title }}</h2>
                <trackslist :tracks="albumdetails.media[0].tracks"></trackslist>              
            </div>
        </div>
    `,
    data(){
        return {
            title:"Pistes"
        }
    }
})

//Display list of tracks response
Vue.component('trackslist',{
    props:['tracks'],
    template: `
    <table class="table table-striped table-dark">            
        <thead>
            <tr>                
                <th scope="col">Numéro de la piste</th>
                <th scope="col">Nom</th>
                <th scope="col">Durée (min:sec)</th>                        
            </tr>
        </thead>
        <tbody>        
            <tr v-for="track in tracks">
                <td><div v-if="track.number">{{ track.number }}</div></td>
                <td><div v-if="track.title">{{ track.title }}</div></td>
                <td><div v-if="track.length">{{ Math.floor(track.length/60000) }} : {{ Math.floor((track.length/60000%1)*60) }}</div></td>
            </tr>             
            <div v-if="tracks.length==0">Aucune piste.</div>                             
        </tbody>  
    </table>  
    `,
    computed: {       
    },
})