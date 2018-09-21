import React, { Component } from 'react';
import axios from 'axios';

export class FetchAlbum extends Component {
    displayName = FetchAlbum.name

    constructor(props) {
        super(props);
        this.state = { albums: [], loading: true };
    }

    componentDidMount() {
        this.getAlbumData();
    }

    getAlbumData() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(data => {
                console.log(data);
                this.setState({ albums: (data.data).slice(0,10), loading: false });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static renderAlbumsData(album) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Thumbnail Image</th>
                    </tr>
                </thead>
                <tbody>
                    {album.map(albm =>
                        <tr key={albm.id}>
                            <td>
                                {albm.title}
                            </td>
                            <td>
                                <img style={{ height: '150px', width: '150px' }} alt="" src={albm.url} />
                            </td>
                            <td>
                                <img style={{ height: '150px', width: '150px' }} alt="" src={albm.thumbnailUrl} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let albums = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchAlbum.renderAlbumsData(this.state.albums);

        return (
            <div>
                <h1>My Album</h1>
                <p>This page shows the album data with image</p>
                {albums}
            </div>
        );
    }
}
