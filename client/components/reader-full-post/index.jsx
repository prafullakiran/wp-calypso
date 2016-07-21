/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import StickyPanel from 'components/sticky-panel';
import Gridicon from 'components/gridicon';
import { setSection } from 'state/ui/actions';

export class FullPostView extends React.Component {

	componentWillMount() {
		this.props.setSection( { hasSidebar: false } );
	}

	render() {
		return (
			<Main className="reader-full-post">
				<StickyPanel>
					<div className="reader-full-post__back">
						<Gridicon icon="arrow-left" />
					{ translate( 'Back' ) }
					</div>
				</StickyPanel>
				Reader full post
			</Main>
		);
	}
}

/**
 * A container for the FullPostView responsible for binding to Flux stores
 */
export class FullPostFluxContainer extends React.Component {
	constructor( props ) {
		super( props );
		this.state = this.getStateFromStores( props );
	}

	getStateFromStores( props = this.props ) {

	}

	componentWillMount() {

	}

	componentWillReceiveProps( nextProps ) {

	}

	componentWillUnmount() {

	}

	render() {
		return <FullPostView post={ this.state.post } site={ this.state.site } feed={ this.state.feed } />;
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
)( FullPostFluxContainer );
