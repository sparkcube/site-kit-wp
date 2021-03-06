/**
 * pageviewIncrease function.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { numberFormat, getTimeInSeconds, getModulesData } from '../../util';
import { calculateOverviewData } from '../../modules/analytics/util';

const pageviewIncrease = ( data, id ) => {
	const modulesData = getModulesData();

	if ( ! modulesData.analytics || ! modulesData.analytics.active ) {
		return false;
	}

	if ( ! data || ! data.reports ) {
		return false;
	}

	const overviewData = calculateOverviewData( data );

	if ( ! overviewData ) {
		return false;
	}

	const { totalPageViewsChange, totalPageViews } = overviewData;

	if ( 10 > totalPageViewsChange ) {
		return false;
	}

	return {
		id,
		title: __( 'Increased page views!', 'google-site-kit' ),
		description: __( 'Over the past 4 weeks', 'google-site-kit' ),
		format: 'large',
		logo: false,
		winImage: `${ global.googlesitekit.admin.assetsRoot }images/sun-small.png`,
		blockData: [
			{
				title: __( 'Total Page Views', 'google-site-kit' ),
				datapoint: numberFormat( totalPageViews ),
				datapointUnit: '',
			},
			{
				title: __( 'Increase', 'google-site-kit' ),
				datapoint: totalPageViewsChange,
				datapointUnit: '%',
			},
		],
		type: 'win-stats-increase',
		dismissExpires: getTimeInSeconds( 'month' ),
		showOnce: true,
	};
};

export default pageviewIncrease;
