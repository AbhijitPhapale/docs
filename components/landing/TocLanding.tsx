import { useRouter } from 'next/router'
import cx from 'classnames'

import { useTocLandingContext } from 'components/context/TocLandingContext'
import { useTranslation } from 'components/hooks/useTranslation'
import { DefaultLayout } from 'components/DefaultLayout'
import { TableOfContents } from 'components/landing/TableOfContents'
import { ArticleTitle } from 'components/article/ArticleTitle'
import { MarkdownContent } from 'components/ui/MarkdownContent'
import { ArticleList } from 'components/landing/ArticleList'
import { ArticleGridLayout } from 'components/article/ArticleGridLayout'
import { Callout } from 'components/ui/Callout'
import { Lead } from 'components/ui/Lead'
import { LearningTrackNav } from 'components/article/LearningTrackNav'
import { ClientSideRedirects } from 'components/ClientSideRedirects'
import { RestRedirect } from 'components/RestRedirect'
import { Breadcrumbs } from 'components/page-header/Breadcrumbs'

export const TocLanding = () => {
  const router = useRouter()
  const {
    title,
    intro,
    tocItems,
    productCallout,
    variant,
    featuredLinks,
    renderedPage,
    currentLearningTrack,
  } = useTocLandingContext()
  const { t } = useTranslation('toc')

  return (
    <DefaultLayout>
      {router.route === '/[versionId]/rest/[category]' && <RestRedirect />}
      {/* Doesn't matter *where* this is included because it will
      never render anything. It always just return null. */}
      <ClientSideRedirects />

      <div className="container-xl px-3 px-md-6 my-4">
        <div className={cx('my-3 mr-auto width-full')}>
          <Breadcrumbs />
        </div>
        <ArticleGridLayout>
          <ArticleTitle>{title}</ArticleTitle>

          {intro && <Lead data-search="lead">{intro}</Lead>}

          {productCallout && (
            <Callout variant="success" dangerouslySetInnerHTML={{ __html: productCallout }} />
          )}

          <div className="border-bottom border-xl-0 pb-4 mb-5 pb-xl-2 mb-xl-2" />

          <div className={variant === 'expanded' ? 'mt-5' : 'mt-2'}>
            {featuredLinks.gettingStarted && featuredLinks.popular && (
              <div className="pb-8 container-xl">
                <div className="gutter gutter-xl-spacious clearfix">
                  <div className="col-12 col-lg-6 mb-md-4 mb-lg-0 float-left">
                    <ArticleList
                      title={t('getting_started')}
                      articles={featuredLinks.gettingStarted}
                    />
                  </div>

                  <div className="col-12 col-lg-6 float-left">
                    <ArticleList title={t('popular')} articles={featuredLinks.popular} />
                  </div>
                </div>
              </div>
            )}

            {renderedPage && (
              <div id="article-contents" className="mb-5">
                <MarkdownContent>{renderedPage}</MarkdownContent>
              </div>
            )}

            <TableOfContents items={tocItems} variant={variant} />
          </div>
        </ArticleGridLayout>

        {currentLearningTrack?.trackName ? (
          <div className="mt-4">
            <LearningTrackNav track={currentLearningTrack} />
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  )
}
