if (typeof BSS_B2B !== "undefined" && BSS_B2B) {
  setTimeout(() => {
    const observer = new MutationObserver((MutationList) => {
      for (let item of MutationList) {
        if (item.target.classList.contains("subtotal_bss")) {
          BSS_B2B.observer.cartSubject.listenCartCheckout();
        }
        if (item.target.classList.contains("productResultContainer")) {
          handleCartDrawerFooterMutation();
        }
        if (item.target.classList.contains("yv-side-drawer-container")) {
          document.dispatchEvent(new Event(`bss_b2b:QuickviewLoaded`));
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    async function handleCartDrawerFooterMutation() {
      if (BSS_B2B) {
        const res = await BSS_B2B.storage.productStorage.load();
        if (res) {
          if (
            res.notExistProductIds?.length ||
            res.productIds?.length ||
            res.variantIds?.size
          ) {
            BSS_B2B.observer.productSubject.notifyObserver(
              "LazyProduct",
              "LoadedLazyProduct",
              {
                ...res,
              }
            );
          }
        }
      }
    }
  }, 300);
}
