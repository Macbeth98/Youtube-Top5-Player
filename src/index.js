import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDGxSq8lkvWBBKuXICMsYcu0KKbdVGNYGM';

//Example for YT search
//new Component and it should produce the HTML
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
       videos: [],
       selectedVideo:null
      };

      this.videoSearch('Avengers');
  }

videoSearch(term){
  YTSearch({ key: API_KEY, term: term }, (data)=>{
    this.setState({
      videos: data,
      selectedVideo:data[0]
    });
  });
}

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
  return (
    <div>
    <SearchBar onSerachTermChange={videoSearch}/>
    <VideoDetail video ={this.state.selectedVideo}/>
    <VideoList
    onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
    videos={this.state.videos}/>
    </div>
  ); //JSX
}
}

//Take this components generated HTML and put it on the page(in the DOM)


ReactDOM.render(<App />, document.querySelector('.container'));
