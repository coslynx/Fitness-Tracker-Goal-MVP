import { useState } from 'react';
import { useStore } from '@/store';
import { ShareButton, ShareDialog } from 'react-share';

interface SocialShareButtonProps {
  title: string;
  shareUrl: string;
  progressData: any;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  title,
  shareUrl,
  progressData,
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleShareClick = () => {
    setShowShareDialog(true);
  };

  const handleDialogClose = () => {
    setShowShareDialog(false);
  };

  const shareMessage = `Check out my progress on ${title}! ${progressData.workoutName} - ${progressData.duration} minutes`;

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleShareClick}
      >
        Share
      </button>
      {showShareDialog && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={handleDialogClose}
          title={title}
          url={shareUrl}
          description={shareMessage}
        >
          <ShareButton
            url={shareUrl}
            title={title}
            description={shareMessage}
            className="share-button"
            children="Share on Facebook"
            hashtag="#fitness"
          />
          <ShareButton
            url={shareUrl}
            title={title}
            description={shareMessage}
            className="share-button"
            children="Share on Twitter"
            hashtag="#fitness"
          />
          <ShareButton
            url={shareUrl}
            title={title}
            description={shareMessage}
            className="share-button"
            children="Share on LinkedIn"
            hashtag="#fitness"
          />
        </ShareDialog>
      )}
    </>
  );
};

export default SocialShareButton;