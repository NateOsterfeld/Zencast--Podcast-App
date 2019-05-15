import React from 'react';
import './PodcastCard.css';

class PodcastCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, image, publisher } = this.props;
        return (
            <div className="podcast fl">
                <a href="http://localhost:3000/id:podcast" className="podcast-a">
                    <img src={image} alt="podcast" className="podcast-image" />
                    <p style={{width: 200 + 'px'}}>
                        <strong>{title}</strong>
                    </p>
                    <p>{publisher}</p>
                </a>
            </div>
        )    
    }
    
}

export default PodcastCard;