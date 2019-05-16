import React from 'react';
import './PodcastCard.css';

class PodcastCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, image, publisher } = this.props;
        return (
            <div className="podcast fl">
                <div 
                    onClick = {() => this.props.getEpisodes(id, title, image, publisher) }
                    className="podcast-a">
                    <img src={image} alt="podcast" className="podcast-image" />
                    <p style={{width: 200 + 'px'}}>
                        <strong>{title}</strong>
                    </p>
                    <p>{publisher}</p>
                </div>
            </div>
        )    
    }
    
}

export default PodcastCard;