import { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleAdMob } from '@apps-in-toss/web-framework';

const AD_GROUP_ID = 'ait-ad-test-interstitial-id';

interface InterstitialAdCallback {
  onDismiss?: () => void;
}

export function useInterstitialAd(adGroupId: string = AD_GROUP_ID) {
  const [loading, setLoading] = useState(true);
  const [adSupported, setAdSupported] = useState(true);
  const dismissCallbackRef = useRef<(() => void) | undefined>();

  useEffect(() => {
    try {
      const isAdUnsupported = GoogleAdMob?.loadAppsInTossAdMob?.isSupported?.() === false;

      if (isAdUnsupported) {
        setAdSupported(false);
        setLoading(false);
        return;
      }

      setLoading(true);

      const cleanup = GoogleAdMob.loadAppsInTossAdMob({
        options: { adGroupId },
        onEvent: (event: any) => {
          if (event.type === 'loaded') setLoading(false);
        },
        onError: () => setLoading(false),
      });

      return cleanup;
    } catch {
      setAdSupported(false);
      setLoading(false);
    }
  }, [adGroupId]);

  const showInterstitialAd = useCallback(({ onDismiss }: InterstitialAdCallback) => {
    try {
      const isAdUnsupported = GoogleAdMob?.showAppsInTossAdMob?.isSupported?.() === false;
      if (isAdUnsupported) throw new Error('unsupported');
    } catch {
      onDismiss?.();
      return;
    }

    if (!adSupported || loading) {
      onDismiss?.();
      return;
    }

    dismissCallbackRef.current = onDismiss;

    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId },
      onEvent: (event: any) => {
        switch (event.type) {
          case 'requested':
            setLoading(true);
            break;
          case 'dismissed':
            dismissCallbackRef.current?.();
            dismissCallbackRef.current = undefined;
            reloadAd();
            break;
          case 'failedToShow':
            dismissCallbackRef.current?.();
            dismissCallbackRef.current = undefined;
            break;
        }
      },
      onError: () => {
        dismissCallbackRef.current?.();
        dismissCallbackRef.current = undefined;
      },
    });
  }, [loading, adSupported, adGroupId]);

  const reloadAd = useCallback(() => {
    if (!adSupported) return;
    setLoading(true);
    GoogleAdMob.loadAppsInTossAdMob({
      options: { adGroupId },
      onEvent: (event: any) => {
        if (event.type === 'loaded') setLoading(false);
      },
      onError: () => setLoading(false),
    });
  }, [adSupported, adGroupId]);

  return { loading, adSupported, showInterstitialAd };
}
