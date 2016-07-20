/** @ssr-ready **/

/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { localize } from 'i18n-calypso';
import {
	get,
	identity
} from 'lodash';

/**
 * Internal dependencies
 */
import SocialLogo from 'components/social-logo';

const services = translate => ( {
	facebook: { icon: 'facebook', label: translate( 'Facebook feed' ) },
	google: { icon: 'google-plus-alt', label: translate( 'Google search' ) },
	linkedin: { icon: 'linkedin', label: translate( 'LinkedIn share' ) },
	twitter: { icon: 'twitter', label: translate( 'Twitter card' ) },
	wordpress: { icon: 'wordpress', label: translate( 'WordPress.com reader' ) }
} );

export const SocialItem = props => {
	const {
		isSelected,
		onClick,
		service,
		translate
	} = props;

	const { icon, label } = get( services( translate ), service );
	const classes = classNames( 'vertical-selector__social-item', {
		'is-selected': isSelected
	} );

	return (
		<div className={ classes } onClick={ onClick }>
			<SocialLogo icon={ icon } /> { label }
		</div>
	);
};

SocialItem.propTypes = {
	service: PropTypes.oneOf( Object.keys( services( identity ) ) ).isRequired,
	translate: PropTypes.func.isRequired
};

export default localize( SocialItem );
