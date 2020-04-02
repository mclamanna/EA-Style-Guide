(function ($) {
    'use strict'

    $(function () {

        // Tooltip and popover demos
        $('.tooltip-demo').tooltip({
            selector: '[data-toggle="tooltip"]',
            container: 'body'
        })

        $('[data-toggle="popover"]').popover()

        // Demos within modals
        $('.tooltip-test').tooltip()
        $('.popover-test').popover()

        // Indeterminate checkbox example
        $('.bd-example-indeterminate [type="checkbox"]').prop('indeterminate', true)

        // Disable empty links in docs examples
        $('.bd-content [href="#"]').click(function (e) {
            e.preventDefault()
        })

        // Modal relatedTarget demo
        $('#exampleModal').on('show.bs.modal', function (event) {
            var $button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = $button.data('whatever') // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var $modal = $(this)
            $modal.find('.modal-title').text('New message to ' + recipient)
            $modal.find('.modal-body input').val(recipient)
        })

        // Activate animated progress bar
        $('.bd-toggle-animated-progress').on('click', function () {
            $(this).siblings('.progress').find('.progress-bar-striped').toggleClass('progress-bar-animated')
        })

        // Insert copy to clipboard button before .highlight
        $('.highlight').each(function () {
            var btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>'
            $(this).before(btnHtml)
            $('.btn-clipboard').tooltip()
        })

        var clipboard = new Clipboard('.btn-clipboard', {
            target: function (trigger) {
                return trigger.parentNode.nextElementSibling
            }
        })

        clipboard.on('success', function (e) {
            $(e.trigger)
                .attr('title', 'Copied!')
                .tooltip('_fixTitle')
                .tooltip('show')
                .attr('title', 'Copy to clipboard')
                .tooltip('_fixTitle')

            e.clearSelection()
        })

        clipboard.on('error', function (e) {
            var modifierKey = /Mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
            var fallbackMsg = 'Press ' + modifierKey + 'C to copy'

            $(e.trigger)
                .attr('title', fallbackMsg)
                .tooltip('_fixTitle')
                .tooltip('show')
                .attr('title', 'Copy to clipboard')
                .tooltip('_fixTitle')
        })

    })

}(jQuery))

;
(function () {
    'use strict'

    anchors.options.placement = 'left'
    anchors.add('.bd-content > h1, .bd-content > h2, .bd-content > h3, .bd-content > h4, .bd-content > h5')
}())
