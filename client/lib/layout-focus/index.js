/** @ssr-ready **/

/**
 * Internal dependencies
 */
import Emitter from 'lib/mixins/emitter';
import config from 'config';
import { getCurrentLayoutFocus, getPreviousLayoutFocus } from 'state/ui/selectors';
import { setLayoutFocus, setNextLayoutFocus, activateNextLayoutFocus } from 'state/ui/actions';

// These are the structural areas
// of the main body of Calypso
const _areas = [ 'content', 'sidebar', 'sites', 'preview' ];
function isValid( area ) {
	const valid = _areas.indexOf( area ) !== -1;

	if ( ! valid ) {
		if ( config( 'env' ) === 'development' ) {
			throw new Error( area + ' is not a valid layout focus area' );
		}
	}

	return valid;
}

// This is unfortunately necessary to avoid layout elements still in the DOM
// being targeted by things like browser inline search, which may cause odd
// positioning effects by having their CSS modified.
function setFocusHideClass() {
	if ( typeof document === 'undefined' ) {
		return;
	}
	// Whenever layout focus changes remove `focus-hide` so
	// that animations can occur with all elements visible.
	document.documentElement.classList.remove( 'focus-hide' );

	// After transitions restore `focus-hide`
	setTimeout( function() {
		document.documentElement.classList.add( 'focus-hide' );
	}, 200 );
}

// Used to keep a reference to the Redux store so we can update it when the
// legacy Flux store is updated.
let reduxStore;
function bindLayoutFocusStore( store ) {
	reduxStore = store;
}

/**
 * This module stores the current and previous
 * layout focus for easy, centralized access and
 * retrieval from anywhere in the app.
 *
 * These focus area values are whitelisted and used for informing
 * what the focus for any view of Calypso should be.
 *
 * This is a legacy Flux store; there is a Redux store available instead under
 * state.ui.layoutFocus.
 */
const layoutFocus = {

	// Store `current` and `previous` states
	// as internal attributes
	_current: null,
	_previous: null,
	_next: null,

	getCurrent: function() {
		if ( reduxStore ) {
			return getCurrentLayoutFocus( reduxStore.getState() );
		}
		return this._current || 'content';
	},

	getPrevious: function() {
		if ( reduxStore ) {
			return getPreviousLayoutFocus( reduxStore.getState() );
		}
		return this._previous;
	},

	set: function( area ) {
		if ( reduxStore ) {
			return reduxStore.dispatch( setLayoutFocus( area ) );
		}

		if ( ! isValid( area ) || area === this._current ) {
			return;
		}

		this._previous = this._current;

		setFocusHideClass();

		// Update current state and emit change event
		this._current = area;
		this.emit( 'change' );
	},

	next: function() {
		if ( reduxStore ) {
			return reduxStore.dispatch( activateNextLayoutFocus() );
		}
		let area = this._next;

		// If we don't have a change queued and the focus has changed
		// previously, set it to `content`. This avoids having to set the
		// focus to content on all navigation links because it becomes the
		// default after focus has shifted.
		if ( ! area && this._previous !== null ) {
			area = 'content';
		}

		if ( ! area ) {
			return;
		}

		this._next = null;

		this.set( area );
	},

	setNext: function( area ) {
		if ( reduxStore ) {
			return reduxStore.dispatch( setNextLayoutFocus( area ) );
		}

		if ( ! isValid( area ) ) {
			return;
		}

		this._next = area;
	},

};

/**
 * Mixins
 */
Emitter( layoutFocus );

layoutFocus.bindLayoutFocusStore = bindLayoutFocusStore;
layoutFocus.setFocusHideClass = setFocusHideClass;

module.exports = layoutFocus;
