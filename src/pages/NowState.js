import React from 'react';

class NowState extends React.Component {

    state = {
        isLike: false,
        count: 0  // 狀態默認為 False
    };

    handleClick = () => {
        this.setState({
            isLike: !this.state.isLike
        });
        this.setState({
            count: this.state.count + 1
        });
        this.setState(prevState => {  // 取得前一個狀態
            return { count : prevState.count + 2}
        });
        console.log(this.state.count);
        console.log(this.state.isLike);
    };

    render() {
        return (
            <div className="login-wrapper">

                <div className="control">
                    <button className="button is-hovered" onClick={this.handleClick}>
                        {this.state.isLike ? 'No' : 'Good'}
                    </button>
                </div>

            </div>  
        );
    }
}

export default NowState;



