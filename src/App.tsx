import {
  AtomicBreadbox,
  AtomicColorFacet,
  AtomicDidYouMean,
  AtomicFacet,
  AtomicFacetManager,
  AtomicFormatCurrency,
  AtomicLayoutSection,
  AtomicLoadMoreResults,
  AtomicNoResults,
  AtomicNumericFacet,
  AtomicNumericRange,
  AtomicQueryError,
  AtomicQuerySummary,
  AtomicRatingFacet,
  AtomicRatingRangeFacet,
  AtomicRefineToggle,
  AtomicSearchBox,
  AtomicSearchInterface,
  AtomicSearchLayout,
  AtomicSortDropdown,
  AtomicSortExpression,
  AtomicTimeframe,
  AtomicTimeframeFacet,
  AtomicSearchBoxInstantResults,
  buildSearchEngine,
  AtomicSearchBoxRecentQueries,
  AtomicResultSectionVisual,
  AtomicResultImage,
  AtomicResultSectionTitle,
  AtomicResultLink,
  AtomicResultSectionTitleMetadata,
  AtomicResultRating,
  AtomicResultNumber,
  Bindings,
  AtomicSearchBoxQuerySuggestions,
  AtomicResultBadge,
  AtomicResultDate,
  AtomicResultFieldsList,
  AtomicResultList,
  AtomicResultMultiValueText,
  AtomicResultPrintableUri,
  AtomicResultSectionBadges,
  AtomicResultSectionBottomMetadata,
  AtomicResultSectionEmphasized,
  AtomicResultSectionExcerpt,
  AtomicResultText,
  AtomicText,
  Result,
} from '@coveo/atomic-react';
import React from 'react';

function MyTemplate(result: Result) {
  return (
    <>
      <style>{`
        .field {
          display: inline-flex;
          align-items: center;
        }

        .field-label {
          font-weight: bold;
          margin-right: 0.25rem;
        }
      `}</style>
      <AtomicResultSectionBadges>
        <AtomicResultBadge field="ec_brand" />
      </AtomicResultSectionBadges>
      <AtomicResultSectionVisual>
        <AtomicResultImage field="ec_images" />
      </AtomicResultSectionVisual>
      <AtomicResultSectionTitle>
        <AtomicResultLink />
      </AtomicResultSectionTitle>
      <AtomicResultSectionTitleMetadata>
        <AtomicResultRating field="ec_rating" />
        <AtomicResultPrintableUri maxNumberOfParts={3} />
      </AtomicResultSectionTitleMetadata>
      <AtomicResultSectionEmphasized>
        <AtomicResultNumber field="ec_price">
          <AtomicFormatCurrency currency="USD" />
        </AtomicResultNumber>
      </AtomicResultSectionEmphasized>
      <AtomicResultSectionExcerpt>
        <AtomicResultText field="ec_shortdesc" />
      </AtomicResultSectionExcerpt>
      <AtomicResultSectionBottomMetadata>
        <AtomicResultFieldsList>
          <div className="field">
            <AtomicText value="Date" />
            <AtomicResultDate format="ddd MMM D YYYY" />
          </div>
          {result.raw.cat_platform !== undefined && (
            <div className="field">
              <span className="field-label">
                <AtomicText value="Platform" />
              </span>
              <AtomicResultText field="cat_platform" />
            </div>
          )}
          {result.raw.cat_condition !== undefined && (
            <div className="field">
              <span className="field-label">
                <AtomicText value="Condition" />
              </span>
              <AtomicResultText field="cat_condition" />
            </div>
          )}
          {result.raw.cat_categories !== undefined && (
            <div className="field">
              <span className="field-label">
                <AtomicText value="Tags" />
              </span>
              <AtomicResultMultiValueText field="cat_categories" />
            </div>
          )}
        </AtomicResultFieldsList>
      </AtomicResultSectionBottomMetadata>
    </>
  );
}

function InstantResultsAriaLabelTemplate({ i18n }: Bindings, result: Result) {
  const information = [result.title];

  if ('ec_rating' in result.raw) {
    information.push(
      i18n.t('stars', {
        count: result.raw.ec_rating,
        max: 5,
      })
    );
  } else {
    information.push(i18n.t('no-ratings-available'));
  }

  if ('ec_price' in result.raw) {
    information.push(
      result.raw.ec_price.toLocaleString(i18n.languages, {
        style: 'currency',
        currency: 'USD',
      })
    );
  }

  return information.join(', ');
}

function InstantResultsTemplate() {
  return (
    <>
      <style>{'.result-root{padding: 14px;}'}</style>
      <AtomicResultSectionVisual>
        <AtomicResultImage field="ec_images" />
      </AtomicResultSectionVisual>
      <AtomicResultSectionTitle>
        <AtomicResultLink />
      </AtomicResultSectionTitle>
      <AtomicResultSectionTitleMetadata>
        <AtomicResultRating field="ec_rating" />
        <AtomicResultNumber field="ec_price">
          <AtomicFormatCurrency currency="USD" />
        </AtomicResultNumber>
      </AtomicResultSectionTitleMetadata>
    </>
  );
}

export default function App() {
  const engine = buildSearchEngine({
    configuration: {
      accessToken: 'xxc23ce82a-3733-496e-b37e-9736168c4fd9',
      organizationId: 'electronicscoveodemocomo0n2fu8v',
    },
  });
  return (
    <AtomicSearchInterface
      engine={engine}
      pipeline="Search"
      searchHub="MainSearch"
      fieldsToInclude="ec_price,ec_rating,ec_images,ec_brand,cat_platform,cat_condition,cat_categories,cat_review_count,cat_color"
      localization={(i18n) => {
        i18n.addResourceBundle('en', 'translation', {
          'no-ratings-available': 'No ratings available',
        });
      }}
    >
      <AtomicSearchLayout>
        <AtomicLayoutSection section="search">
          <AtomicSearchBox>
            <AtomicSearchBoxQuerySuggestions />
            <AtomicSearchBoxRecentQueries />
            <AtomicSearchBoxInstantResults
              template={InstantResultsTemplate}
              imageSize="small"
              ariaLabelGenerator={InstantResultsAriaLabelTemplate}
            />
          </AtomicSearchBox>
        </AtomicLayoutSection>
        <AtomicLayoutSection section="facets">
          <AtomicFacetManager>
            <AtomicFacet field="source" label="Source" />
            <AtomicFacet field="objecttype" label="Type" />
            <AtomicNumericFacet
              field="cat_review_count"
              label="Amount of reviews"
              displayValuesAs="link"
            >
              <AtomicNumericRange start={0} end={150} label="Few" />
              <AtomicNumericRange
                start={150}
                end={650}
                label="A moderate amount"
              />
              <AtomicNumericRange start={650} end={9999999999} label="A lot" />
            </AtomicNumericFacet>
            <AtomicColorFacet
              field="cat_color"
              label="Color"
              numberOfValues={6}
              sortCriteria="occurrences"
            />
            <AtomicNumericFacet
              field="ec_price"
              label="Cost"
              withInput="integer"
            >
              <AtomicFormatCurrency currency="USD" />
            </AtomicNumericFacet>
            <AtomicTimeframeFacet withDatePicker label="Listed within">
              <AtomicTimeframe unit="hour" />
              <AtomicTimeframe unit="day" />
              <AtomicTimeframe unit="week" />
              <AtomicTimeframe unit="month" />
              <AtomicTimeframe unit="quarter" />
              <AtomicTimeframe unit="year" />
              <AtomicTimeframe unit="year" amount={10} period="next" />
            </AtomicTimeframeFacet>
            <AtomicRatingFacet
              field="ec_rating"
              label="Rating"
              numberOfIntervals={5}
            />
            <AtomicRatingRangeFacet
              field="ec_rating"
              label="Rating Range"
              numberOfIntervals={5}
              facetId="ec_rating_range"
            />
          </AtomicFacetManager>
        </AtomicLayoutSection>
        <AtomicLayoutSection section="main">
          <AtomicLayoutSection section="status">
            <AtomicBreadbox />
            <AtomicQuerySummary enableDuration={false} />
            <AtomicRefineToggle />
            <AtomicSortDropdown>
              <AtomicSortExpression label="relevance" expression="relevancy" />
              <AtomicSortExpression
                label="Price (low to high)"
                expression="ec_price ascending"
              />
              <AtomicSortExpression
                label="Price (high to low)"
                expression="ec_price descending"
              />
            </AtomicSortDropdown>

            <AtomicDidYouMean />
          </AtomicLayoutSection>
          <AtomicLayoutSection section="results">
            <AtomicResultList
              display="grid"
              imageSize="large"
              template={MyTemplate}
            />
            <AtomicQueryError />
            <AtomicNoResults />
          </AtomicLayoutSection>
          <AtomicLayoutSection section="pagination">
            <AtomicLoadMoreResults />
          </AtomicLayoutSection>
        </AtomicLayoutSection>
      </AtomicSearchLayout>
    </AtomicSearchInterface>
  );
}
