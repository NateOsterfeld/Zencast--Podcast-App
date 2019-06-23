import React from 'react';
import './CuratedListCard.scss';

class CuratedListCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, image, margin, podcasts } = this.props;
        
        return (
            <div className="podcast fl" style={{margin: 0 + 'px ' + margin + 'px'}}>
                <div                  /*getPodcasts() is getListPodcasts() from App.js*/
                    onClick = { () => this.props.getPodcasts(id, title, podcasts) }
                    className="podcast-a">
                    <img src={image} alt="podcast" className="podcast-image" />
                    <p style={{width: 200 + 'px'}}>
                        <strong>{title}</strong>
                    </p>
                    <p></p>
                </div>
            </div>
        )    
    }
    
}

export default CuratedListCard;