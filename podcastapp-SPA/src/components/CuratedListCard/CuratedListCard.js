import React from 'react';
import './CuratedListCard.scss';
import { Link } from 'react-router-dom';

class CuratedListCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, image, margin, podcasts } = this.props;
        
        return (
            <div className="podcast fl" style={{margin: 0 + 'px ' + margin + 'px'}}>
                <Link to={`/curated/${title.toLowerCase()}`} 
                    onClick = { () => this.props.getListPodcasts(id, title) }
                    className="podcast-a">
                    <img src={image} alt="podcast" className="podcast-image" />
                    <p style={{width: 200 + 'px'}}>
                        <strong>{title}</strong>
                    </p>
                    <p></p>
                </Link>
            </div>
        )    
    }
    
}

export default CuratedListCard;