import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import React from 'react';

import modelActionCreators from '../actions/model-action-creators';
import LoLoMoContainer from './LoLoMoContainer';


@connect(
  state => ({ models: state.get('models') }),
  dispatch => ({
    actions: bindActionCreators(modelActionCreators, dispatch)
  })
)
/**
 * Home page container.
 */
export default class HomePage extends React.PureComponent {
  static propTypes = {
    models: React.PropTypes.objectOf(Immutable.Map).isRequired,
    actions: React.PropTypes.shape({
      loadComingSoon: React.PropTypes.func.isRequired,
      loadInTheaters: React.PropTypes.func.isRequired,
      loadTop20: React.PropTypes.func.isRequired
    }).isRequired
  }

  componentDidMount() {
    this.props.actions.loadInTheaters();
    this.props.actions.loadComingSoon();
    this.props.actions.loadTop20();
  }

  render() {
    // We only want to show inTheaters and comingSoon in the home page.
    // This is why LoLoMo MUST be a pure component which is using shallow comparation.
    const models = Immutable.Map({
      inTheaters: this.props.models.get('inTheaters'),
      comingSoon: this.props.models.get('comingSoon'),
      top20: this.props.models.get('top20')
    });
    return (
      <div className="mb-page mb-home-page">
        <LoLoMoContainer models={models} />
      </div>
    );
  }
}
