/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import StickyPanel from 'components/sticky-panel';
import Gridicon from 'components/gridicon';
import { setSection } from 'state/ui/actions';

export class FullPostContainer extends React.Component {

	componentWillMount() {
		this.props.setSection( { hasSidebar: false } );
	}

	render() {
		return (
			<Main className="reader-full-post">
				<StickyPanel>
					<div className="reader-full-post__back">
						<Gridicon icon="back" />
						Back
					</div>
				</StickyPanel>
				Reader full post
			</Main>
		);
	}
}

export default connect(
	state => {
		return { post: { ID: 1 } };
	},
	dispatch => {
		return bindActionCreators( {
			setSection
		}, dispatch );
	}
)( FullPostContainer );
